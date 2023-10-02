import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

interface ModalFormProps {
  isVisible: Boolean;
  onClose: any;
  product: any;
  updateProductList:any;
}
const ModalForm = ({ isVisible, onClose, product,updateProductList }: ModalFormProps) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        image: null,
      });
  if (!isVisible) return null;
  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') onClose();
  };
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      // Handle file input separately to get the File object
      const imageFile = files[0];
      setFormData({
        ...formData,
        image: imageFile,
      });
    } else {
      // For other inputs, update their values as usual
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { title, category, description, image } = formData;
    // Create a FormData object to send the file as multipart/form-data
    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('category', category);
    formDataToSend.append('description', description);
    // Check if an image file is selected before appending it
    if (image) {
      formDataToSend.append('image', image);
    }
    try {
      // Make a POST request to your server endpoint
      const response = await axios.put(
        `http://localhost:3000/product/update/${product._id}`,
        formDataToSend,
      );

      // Handle the response as needed, e.g., show a success message
      console.log('Product updated successfully', response.data);
      toast.success(`Product updated successfully`, {
        theme: 'colored'
      });
      // Reset the form by setting formData to empty values
      setFormData({
        title: '',
        category: '',
        description: '',
        image: null,
      });
      onClose()

      if (updateProductList) {
        await updateProductList();
      }
    } catch (error) {
      console.error('Error adding product', error);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <div className="p-7">
            <form action="#" onSubmit={handleSubmit}>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="title"
                    onChange={handleChange}
                    defaultValue={product.title}
                  />
                  {/* </div> */}
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="category"
                    id="category"
                    placeholder="category"
                    defaultValue={product.category}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_88_10224">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <textarea
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="description"
                    id="description"
                    rows={2}
                    placeholder="Write your Description here"
                    defaultValue={product.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="image"
                  >
                    Image
                  </label>
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        onChange={handleChange}
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
