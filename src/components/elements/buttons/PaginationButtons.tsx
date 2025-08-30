"use client";

interface PaginationButtonsProps {
    currentPage: number;
    totalPages: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ currentPage, totalPages }) => {
    return (
        <div className="flex items-center justify-center gap-x-4 mt-6 text-xs md:text-base ">
            <button
                onClick={() => window.location.search = `?page=${currentPage - 1}`}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-Secondary-300 hover:bg-Secondary-100 text-Secondary-0 rounded disabled:bg-Greyscale-400 hover:cursor-pointer disabled:hover:cursor-not-allowed">قبل</button>
            <span>{currentPage} از {totalPages}</span>
            <button
                onClick={() => window.location.search = `?page=${currentPage + 1}`}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-Secondary-300 hover:bg-Secondary-100 text-Secondary-0 rounded disabled:bg-Greyscale-400 hover:cursor-pointer disabled:hover:cursor-not-allowed">بعد</button>
        </div>
    );
};

export default PaginationButtons;