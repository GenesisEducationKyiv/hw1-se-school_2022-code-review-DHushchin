export interface IEmailRepository {
    read(): Promise<string[]>;
    write(data: string): Promise<void>;
}
