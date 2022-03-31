import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationButtons = function PaginationButtons() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} size="large" />
    </Stack>
  );
};

export default PaginationButtons;
