export interface Message {
    id?: number;
    type: 'success' | 'error';
    title: string;
    subtitle: string;
    text: string;
}
