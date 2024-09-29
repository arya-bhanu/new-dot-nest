import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/app/book/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
