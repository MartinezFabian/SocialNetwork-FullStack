import moment from 'moment';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import styles from './Comment.module.css';

export const Comment = ({ id, name, description, created_ago, userid }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // Delete comment logic
  const queryClient = useQueryClient();

  const deleteComment = (commentId) => {
    return makeRequest.delete(`comments/${commentId}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const onDeleteComment = () => {
    deleteMutation.mutate(id);
  };

  return (
    <div key={id} className={styles.comment}>
      <AccountCircleRoundedIcon sx={{ fontSize: 28, color: '#766cff' }}></AccountCircleRoundedIcon>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <p className={styles.description}>{description}</p>
      </div>
      <span className={styles.date}>{moment(created_ago).fromNow()}</span>

      <MoreHorizIcon
        onClick={() => setDeleteOpen((prevState) => !prevState)}
        sx={{ fontSize: 18, ':hover': { cursor: 'pointer' } }}
      />

      {deleteOpen && currentUser.id === userid ? (
        <button onClick={onDeleteComment} className={styles.delete}>
          <DeleteIcon sx={{ color: '#fff' }}></DeleteIcon>
        </button>
      ) : null}
    </div>
  );
};
