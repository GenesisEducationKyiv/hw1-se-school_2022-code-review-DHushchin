import FileEmailRepository from '../../repository/file.repository';
import ConflictError from '../../../../exceptions/conflict.exception';

class SubscriptionClient {
    private _repository: FileEmailRepository;

    constructor() {
        this._repository = new FileEmailRepository();
    }

    private async getSubscribers(): Promise<string[]> {
        return await this._repository.findAll();
    }

    public async subscribe(email: string): Promise<void> {
        const subscribers = await this.getSubscribers();

        if (subscribers.includes(email)) {
            throw new ConflictError('Email is already subscribed');
        }

        await this._repository.add(email);
    }
}

export default SubscriptionClient;
