import { toast } from 'react-toastify';

const performToast = ({ msg, type }) => {
  switch (type) {
    case 'success':
      toast.success(msg, { position: 'bottom-center', autoClose: 3000 });
      break;
    case 'error':
      toast.error(msg, { position: 'bottom-center', autoClose: 3000 });
      break;
    case 'info':
      toast.info(msg, { position: 'bottom-center', autoClose: 3000 });
      break;
    default:
      toast(msg, { position: 'bottom-center', autoClose: 3000 });
      break;
  }
};

export default performToast;
