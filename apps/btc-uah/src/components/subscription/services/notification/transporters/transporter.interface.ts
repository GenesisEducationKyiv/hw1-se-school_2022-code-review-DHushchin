import ITransporterOptions from '../transporter-options/transporter-options.interface';

interface ITransporter {
    send(mailOptions: ITransporterOptions): Promise<void>;
}

export default ITransporter;
