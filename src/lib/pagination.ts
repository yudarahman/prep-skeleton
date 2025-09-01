const calculatePagination = (max?: number, page?: number): string[] => {
  const pages: string[] = [];
  const minPaginationLimit: number = 5;
  const maxPaginationLimit: number = 7;
  const paginationStep: number[] = [1, 2, 3, 4, 5, 6, 7];

  switch (true) {
    case !max:
      return [];
    case max! <= minPaginationLimit || max! <= maxPaginationLimit: {
      let min = 1;
      while (min <= max!) {
        pages.push(min.toString());
        min++;
      }
      return pages;
    }
    case max! > maxPaginationLimit: {
      paginationStep.forEach(step => {
        if (page === max) {
          if (step === 1) {
            pages.push('...');
          } else {
            pages.push((step + (page! - maxPaginationLimit)).toString());
          }
        } else {
          if (page! >= minPaginationLimit) {
            if (step === 1 || (step === maxPaginationLimit && (page! + (step - minPaginationLimit)) <= max!)) {
              pages.push('...');
            } else {
              if (page === (max! - 1)) {
                pages.push((page + (step - (minPaginationLimit + 1))).toString());
              } else if ((page! + (step - minPaginationLimit)) <= max!) {
                pages.push((page! + (step - minPaginationLimit)).toString());
              }
            }
          } else {
            if (step === maxPaginationLimit) {
              pages.push('...');
            } else {
              pages.push(step.toString());
            }
          }
        }
      });
      return pages;
    }
    default:
      return [];
  }
};

export { calculatePagination };
