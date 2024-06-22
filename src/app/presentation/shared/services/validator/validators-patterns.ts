export class ValidatorPatters{
  public firstNameAndLastnamePattern: string = '^[A-Za-záéíóúÁÉÍÓÚüÜ]+(?: [A-Za-záéíóúÁÉÍÓÚüÜ]+)? [A-Za-záéíóúÁÉÍÓÚüÜ]+(?: [A-Za-záéíóúÁÉÍÓÚüÜ]+)?$';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=-])\\S{8,16}$";
  public phoneNumberPattern: string = "^(\\+[0-9]{1,3})\\s[0-9]{3}\\s[0-9]{3}\\s[0-9]{3,4}$";
  public numberPattern:string="\\d*";

  constructor(){}
}
