
/**
 * A class that defined a custom file type as well as the logic to recognise it
 * @category File Types
 */
export class FileType<TVal extends string> {

  /** A mimetype filter for use in file inputs */
  get mimeFilter() {
    return this.mimeTypes?.join(',') ?? '*'
  }

  constructor(
    /** The name of the filetype */
    public readonly name: TVal,
    /** Mimetypes for recognising the file type */
    public readonly mimeTypes?: string[],
    /** File extensions for recognising the file type */
    public readonly extensions?: string[],
    /** Custom logic to match the mimetype of the file */
    private readonly customMatch?: (type: string) => boolean
  ) {

  }

  /**
   * Creates a new FileType with identical matching logic
   * @param name - Optional new name for the filetype
   */
  clone<TNewVal extends string>(name?: TNewVal) {
    return new FileType(name ?? this.name, this.mimeTypes, this.extensions, this.customMatch);
  }

  /**
   * Checks if a file is a match
   * @param file - The file to check against
   */
  isMatch(file: File): boolean;
  /**
   * Checks if a file is a match based on the filename and mimetype
   * @param filename - The filename of the file
   * @param type - The mimetype of the file
   */
  isMatch(filename: string, type: string): boolean;
  isMatch(file: string|File, type?: string) : boolean {

    const fileName = file instanceof File ? file.name : file;
    const mimeType = file instanceof File ? file.type : type!;

     if (this.mimeTypes?.includes(mimeType)) return true;
     if (this.customMatch?.(mimeType)) return true;

     if (!this.extensions?.length) return false;

     const split = fileName.split('.');
     if (split.length < 2) return false;

     return this.extensions?.includes(split.pop()!);
  }

}

/**
 * A collection of file types corresponding to enum values
 * @typeParam TEnum - An enum of filetypes
 * @category File Types
 */
export class FileTypeList<TEnum extends { [key: string]: string }> {

  /** A mimetype filter for use in file inputs */
  readonly mimeFilter: string;

  /** A list of all filetype names */
  get values() {return this.types.map(x => x.name)}

  constructor(
    private types: FileType<TEnum[keyof TEnum]>[]
  ) {
    const mimeTypes = types.map(x => x.mimeTypes ?? []);
    const flat = ([] as string[]).concat(...mimeTypes);
    const unique = flat.filter((v, i, a) => a.indexOf(v) === i);
    this.mimeFilter = unique.join(',');
  }


  /**
   * Get the first match in the collection which matches the file
   * @param file
   */
  getMatch(file: File): TEnum[keyof TEnum]|null;
  /**
   * Get the first match in the collection which matches the filename and mimetype
   * @param filename - The filename of the file
   * @param type - The mimetype of the file
   */
  getMatch(filename: string, type: string): TEnum[keyof TEnum]|null;
  getMatch(file: string|File, type?: string) : TEnum[keyof TEnum]|null {

    const fileName = file instanceof File ? file.name : file;
    const mimeType = file instanceof File ? file.type : type!;

    return this.types.find(t => t.isMatch(fileName, mimeType))?.name ?? null;
  }

  /**
   * Get the filetype corresponding to an enum value
   * @param value - The enum value
   */
  getType(value: TEnum[keyof TEnum]) {
    return this.types.find(x => x.name == value);
  }
}
