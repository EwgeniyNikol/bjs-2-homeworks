class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this._state = 100;
		this.type = null;
	}
	get state() {
		return this._state;
	}

	set state(newState) {
		this._state = Math.max(0, Math.min(newState, 100));
	}

	fix() {
		this.state = Math.min(this.state * 1.5, 100);
	}
}

class Magazine extends PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine";
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = "book";
	}
}

class NovelBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel";
	}
}

class FantasticBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic";
	}
}

class DetectiveBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective";
	}
}

class Library {
	constructor(name) {
		this.name = name;
		this.books = [];
	}

	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}

	findBookBy(type, value) {
		return this.books.find(book => book[type] === value) || null;
	}

	giveBookByName(bookName) {
		const book = this.findBookBy("name", bookName);
		if (!book) return null;
		this.books = this.books.filter((item) => item.name !== bookName);
		return book;
	}
}

let library = new Library("Центральная городская библиотека");
let magazine = new Magazine("National Geographic", 2023, 120);
let novel = new NovelBook("Джордж Оруэлл", "1984", 1949, 328);
let fantastic = new FantasticBook("Дж. Р. Р. Толкин", "Властелин Колец", 1954, 423);
let detective = new DetectiveBook("Артур Конан Дойл", "Шерлок Холмс", 1892, 307);
library.addBook(magazine);
library.addBook(novel);
library.addBook(fantastic);
library.addBook(detective);
console.log("Книги в библиотеке после добавления:", library.books.length);

let foundBook = library.findBookBy("releaseDate", 1919);
if (!foundBook) {
	console.log("Книга 1919 года не найдена, создаём новую...");
	let newBook = new Book("Автор 1919", "Книга 1919 года", 1919, 200);
	library.addBook(newBook);
	console.log("Создана и добавлена книга 1919 года");
}

let givenBook = library.giveBookByName("1984");
console.log("Выдана книга:", givenBook?.name);
console.log("Осталось книг в библиотеке:", library.books.length);

if (givenBook) {
	console.log("Состояние книги до повреждения:", givenBook.state);
	givenBook.state = 20;
	console.log("Состояние книги после повреждения:", givenBook.state);

	givenBook.fix();
	console.log("Состояние книги после первого восстановления:", givenBook.state);
	givenBook.fix();
	console.log("Состояние книги после второго восстановления:", givenBook.state);
	givenBook.fix();
	console.log("Состояние книги после третьего восстановления:", givenBook.state);

	console.log("Пытаемся вернуть книгу в библиотеку...");
	library.addBook(givenBook);
	console.log("Книг в библиотеке после попытки вернуть:", library.books.length);

	console.log("Текущее состояние книги:", givenBook.state);
}

console.log("Поиск книги Толкина:", library.findBookBy("author", "Дж. Р. Р. Толкин")?.name);
console.log("Поиск детектива:", library.findBookBy("type", "detective")?.name);

const notFoundBook = library.giveBookByName("Несуществующая книга");
console.log("Попытка выдать несуществующую книгу:", notFoundBook);

console.log("Итоговый список книг в библиотеке:");
library.books.forEach(book => {
	console.log(`- ${book.name} (${book.releaseDate}), состояние: ${book.state}`);
});

class Student {
	constructor(name) {
		this.name = name;
		this.marks = {};
	}

	addMark(mark, subject) {
		if (mark < 2 || mark > 5) {
			console.log(`Оценка ${mark} не добавилась, так как должна быть от 2 до 5`);
			return;
		}

		if (!this.marks[subject]) {
			this.marks[subject] = [];
		}

		this.marks[subject].push(mark);
		console.log(`Добавлена оценка ${mark} по предмету "${subject}"`);
	}

	getAverageBySubject(subject) {
		if (!this.marks[subject] || this.marks[subject].length === 0) {
			console.log(`По предмету "${subject}" нет оценок`);
			return 0;
		}

		const sum = this.marks[subject].reduce((total, mark) => total + mark, 0);
		const average = sum / this.marks[subject].length;

		console.log(`Средний балл по предмету "${subject}": ${average}`);
		return average;
	}

	getAverage() {
		const subjects = Object.keys(this.marks);

		if (subjects.length === 0) {
			console.log("Нет предметов с оценками");
			return 0;
		}


		const totalAverage = subjects.reduce((sum, subject) => {
			return sum + this.getAverageBySubject(subject);
		}, 0);

		const overallAverage = totalAverage / subjects.length;

		console.log(`Общий средний балл по всем предметам: ${overallAverage}`);
		return overallAverage;
	}
}

const student = new Student("Сергей Иванов");

student.addMark(5, "химия");
student.addMark(5, "физика");
student.addMark(4, "физика");
student.addMark(6, "физика");
student.getAverageBySubject("физика");
student.getAverageBySubject("биология");
student.getAverage();