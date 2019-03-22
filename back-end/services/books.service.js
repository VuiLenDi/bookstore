class Books {
    constructor(db, data) {
        this.db = db;
        this.data = data;
    }

    formatBook() {
        return {
            title: this.data.title,
            category: this.data.category,
            desc: this.data.desc
        };
    }

    getList() {
        const conditions = {};
        const fields = {
            _id: 1,
            title: 1,
            category: 1,
            desc: 1
        };

        return this.db.Books.find( conditions, fields).sort({
            title: 1
        });
    }

    addBook() {
        const book = this.formatBook();

        return this.db.Books.create(book)
            .then(() => {
                return book;
            });
    }
}

module.exports = {
    Books
};
