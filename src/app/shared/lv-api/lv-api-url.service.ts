
export class LvApiUrlService {
  public parts : Array<string> = [];

  constructor (private url:string) {}

  public addPart(part) {
    this.parts.push(part);
  }

  public addParts(parts) {
    this.parts = this.parts.concat(parts);
  }

  public build() : string {
    let urlParts = [];
    let formattedUrl:string;

    urlParts.push(this.url);

    if (this.parts) {
      urlParts = urlParts.concat(this.parts);
    }

    formattedUrl = urlParts.join('/');

    return formattedUrl; // + '?cb=JSONP_CALLBACK';
  }

}
