import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UrlTranslation {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    fromUrl: string;
    @Column()
    toUrl: string;
    @Column()
    toId: string;
    @Column()
    lastModifiedAt: Date;
    @Column()
    clickCount: number = 0;
}