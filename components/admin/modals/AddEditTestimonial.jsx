import { cloneElement, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { API } from '../../../api'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Textarea from '../shared/Textarea'

Modal.setAppElement('#modal')

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '90vh',
		overflowX: 'hidden',
	},
}

const DEFAULT_VALUE = {
	text: '',
	photo: '',
	link: '',
	name: '',
	designation: '',
}
export default function AddEditTestimonial({ children, data, testimonials }) {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const { register, handleSubmit, watch, setValue, reset } = useForm({
		defaultValues: data ? data : DEFAULT_VALUE,
	})
	const { mutateAsync: updateStatic } = useMutation(API.MISC.UPDATE_STATIC)

	const onSubmit = useCallback(
		async (formData) => {
			try {
				if (data?._id) {
					await updateStatic({
						testimonial: testimonials.map((item) =>
							String(item._id) === String(data._id) ? formData : item
						),
					})
				} else {
					await updateStatic({
						testimonial: [...(testimonials || []), formData],
					})
				}
				await queryClient.refetchQueries(API.MISC.GET_ADMIN_STATIC.name)
				toast.success(
					`Successfully ${data?._id ? 'updated' : 'created'} a course`
				)
				reset()
				setOpen(false)
			} catch (err) {
				toast.error(err?.response?.data?.msg || err?.message)
			}
		},
		[data, testimonials]
	)

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
				contentLabel={data?._id ? 'Add New' : 'Update' + 'Testimonial'}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='form-group'>
						<Input
							label='Name'
							placeholder='Name of the Testimonial'
							{...register('name')}
						/>
					</div>
					<div className='form-group'>
						<Input
							label='Designation'
							placeholder='Designation of the Testimonial'
							{...register('designation')}
						/>
					</div>
					<div className='form-group'>
						<Input
							label='Text'
							placeholder='Text of the Testimonial'
							{...register('text')}
						/>
					</div>
					<div className='form-group'>
						<Input
							label='Photo'
							type='file'
							placeholder='Photo of the Testimonial'
							defaultFile={watch('photo')}
							onFile={(file) => setValue('photo', file)}
						/>
					</div>
					<div className='form-group'>
						<Input
							label='Link'
							placeholder='Link of the Testimonial'
							{...register('link')}
						/>
					</div>

					<div className='form-group d-flex justify-content-end'>
						<Button type='submit'>{data?._id ? 'Update' : 'Create'}</Button>
					</div>
				</form>
			</Modal>
		</>
	)
}
