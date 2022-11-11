import React , {useEffect} from 'react'
import { Pagination ,PaginationItem } from '@mui/material';
import {Link ,useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import useStyles from "./styles"
import {useDispatch,useSelector} from 'react-redux'
import {getPosts} from '../../actions/posts'
const Paginate =({page})=> {
  const classes =useStyles()
  const dispatch =useDispatch()
  const {numberOfPages} =useSelector((state)=> state.posts)
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);
  return (
    <Stack spacing={2}>
      <Pagination 
      classes={{ ul: classes.ul }}
      count={2} 
      color="primary"
      page ={Number(page || 1)}
      variant="outlined"
      renderItem={(item) => 
        (<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />)
      }
       />
    </Stack>
  );
}
export default Paginate