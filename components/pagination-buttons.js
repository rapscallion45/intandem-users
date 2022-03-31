import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationButtons = function PaginationButtons({ numPages, onChange }) {
  return (
    <Stack spacing={2}>
      <Pagination onChange={onChange} count={numPages} size="large" />
    </Stack>
  );
};

export default PaginationButtons;
