interface IEmailRepository {
    findAll(): Promise<string[]>;
    add(email: string): Promise<void>;
}

export default IEmailRepository;
