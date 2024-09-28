import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
