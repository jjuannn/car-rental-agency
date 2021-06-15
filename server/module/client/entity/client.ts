export default class Client {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public doc_type: string,
    public doc_num: string,
    public address: string,
    public phone: string,
    public e_mail: string,
    public nationality: string,
    public birthdate: string
  ) {}
}
