import './pagination.css';

function PaginationComponent ({ totalUsers, usersPerPage, currentPage, onPageChange }) {
    //Calculate the total number of pages
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        onPageChange(pageNumber);
    };


return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(1)}>
            «
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ⟨
          </button>
        </li>
        <li className="page-item active">
          <button className="page-link">{currentPage}</button>
        </li>
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            ⟩
          </button>
        </li>
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(totalPages)}
          >
            »
          </button>
        </li>
      </ul>
    </nav>
  );

};


  export default PaginationComponent;