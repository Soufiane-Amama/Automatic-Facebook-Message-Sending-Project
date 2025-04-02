import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();
  
  const showToast = (title, status) => {
    toast({
      title,
      status,
      duration: 3000,
      // isClosable: true,
    });
  };

  const toastMessage = ({ title, description = "", status = "info", duration = 4000, position = "bottom", isClosable = false }) => {
    toast({
      title,
      description,
      status, // success, error, warning, info
      duration,
      position, // top, top-right, bottom-left, etc.
      isClosable,
    });
  };
  
  return { showToast, toastMessage };
};

export default useCustomToast;