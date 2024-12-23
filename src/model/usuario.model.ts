export class Usuario {
  private nome: string;
  private matricula: string;
  private idade: number;
  private cargo: string;
  private tipo: number; // 1 para admin, 2 para comum

  constructor(
    nome: string,
    matricula: string,
    idade: number,
    cargo: string,
    tipo: number
  ) {
    this.nome = nome;
    this.matricula = matricula;
    this.idade = idade;
    this.cargo = cargo;
    this.tipo = tipo;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getMatricula(): string {
    return this.matricula;
  }

  public setMatricula(matricula: string): void {
    this.matricula = matricula;
  }

  public getIdade(): number {
    return this.idade;
  }

  public setIdade(idade: number): void {
    this.idade = idade;
  }

  public getCargo(): string {
    return this.cargo;
  }

  public setCargo(cargo: string): void {
    this.cargo = cargo;
  }

  public getTipo(): number {
    return this.tipo;
  }

  public setTipo(tipo: number): void {
    this.tipo = tipo;
  }
}
