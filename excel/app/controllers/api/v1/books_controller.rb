module Api::V1
  class BooksController < ApplicationController
    def index
      @books = Book.all
      render json: @books
    end

    def create
      @book = Book.create(book_params)
      render json: @book
    end

    private
    def book_params
      params.require(:book).permit(:title, :author, :language, :first_published, :approximate_sales)
    end
  end
end
