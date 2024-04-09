import { cloneElement, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API } from "../../../api";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";

Modal.setAppElement("#modal");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
    overflowX: "hidden",
  },
};

const DEFAULT_VALUE = {
  coupon: "",
  discount: "",
};
export default function AddEditCoupon({ children, data }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: data ? data : DEFAULT_VALUE,
  });
  const { mutateAsync: createCoupon } = useMutation(API.COUPONS.CREATE_COUPON);
  const { mutateAsync: updateCoupon } = useMutation(API.COUPONS.UPDATE_COUPON);

  const onSubmit = useCallback(
    async (formData) => {
      try {
        if (data?._id) {
          await updateCoupon({
            // ...formData,
            // _id: undefined,
            // __v: undefined,

            id: formData._id,
            coupon: formData.coupon,
            discount: formData.discount,
          });
        } else {
          await createCoupon(formData);
        }
        await queryClient.refetchQueries(API.COUPONS.GET_COUPONS.name);
        toast.success(
          `Successfully ${data?._id ? "updated" : "created"} a coupon`
        );
        setOpen(false);
      } catch (err) {
        toast.error(err?.response?.data?.msg || err?.message);
      }
    },
    [data]
  );

  return (
    <>
      {children &&
        cloneElement(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel={data?._id ? "Add New" : "Update" + "Coupon"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Input
              label="Coupon Name"
              placeholder="Name of the coupon"
              {...register("coupon")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Amount of discount "
              type="text"
              placeholder="Discount"
              {...register("discount")}
            />
          </div>
          {/* <div className='form-group'>
						<Input
							label='Password'
							type='password'
							placeholder='Password of the student'
							{...register('password')}
						/>
					</div> */}
          <div className="form-group d-flex justify-content-end">
            <Button type="submit">{data?._id ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
