
export class FileType<TVal extends string> {

  get mimeFilter() {
    return this.mimeTypes?.join(',') ?? '*'
  }

  constructor(
    public readonly name: TVal,
    public readonly mimeTypes?: string[],
    public readonly extensions?: string[],
    private readonly customMatch?: (type: string) => boolean
  ) {

  }

  clone<TNewVal extends string>(name: TNewVal) {
    return new FileType(name, this.mimeTypes, this.extensions, this.customMatch);
  }

  isMatch(filename: string, type: string) {
     if (this.mimeTypes?.includes(type)) return true;
     if (this.customMatch?.(type)) return true;

     if (!this.extensions?.length) return false;

     const split = filename.split('.');
     if (split.length < 2) return false;

     return this.extensions?.includes(split.pop()!);
  }

}

export class FileTypeList<TEnum extends { [key: string]: string }> {

  mimeFilter: string;

  get values() {return this.types.map(x => x.name)}

  constructor(private types: FileType<TEnum[keyof TEnum]>[]) {
    const mimeTypes = types.map(x => x.mimeTypes ?? []);
    const flat = ([] as string[]).concat(...mimeTypes);
    const unique = flat.filter((v, i, a) => a.indexOf(v) === i);
    this.mimeFilter = unique.join(',');
  }


  getMatch(file: File): TEnum[keyof TEnum]|null;
  getMatch(filename: string, type: string): TEnum[keyof TEnum]|null;
  getMatch(file: string|File, type?: string) : TEnum[keyof TEnum]|null {

    if (file instanceof File) return this.getMatch(file.name, file.type);

    return this.types.find(t => t.isMatch(file, type!))?.name ?? null;
  }

  getType(value: TEnum[keyof TEnum]) {
    return this.types.find(x => x.name == value);
  }
}

export class FileTypeException extends Error {

  constructor(message: string) {
    super(message);
  }
}
