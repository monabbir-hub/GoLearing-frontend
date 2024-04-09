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
	title: '',
	is_visible: false,
}
export default function AddEditAnnouncement({ children, data, announcements }) {
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
						announcement: announcements.map((item) =>
							String(item._id) === String(data._id) ? formData : item
						),
					})
				} else {
					await updateStatic({
						announcement: [...(announcements || []), formData],
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
		[data, announcements]
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
				contentLabel={data?._id ? 'Add New' : 'Update' + 'Announcement'}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='form-group'>
						<Input
							label='Title'
							placeholder='Title of the Announcement'
							{...register('title')}
							required
						/>
					</div>
					<div className='form-group'>
						<Input
							label='Text'
							placeholder='Text of the Announcement'
							{...register('text')}
							required
						/>
					</div>
					<div className='form-group'>
						<Input
							label='Photo'
							type='file'
							placeholder='Photo of the Announcement'
							defaultFile={watch('photo')}
							onFile={(file) => setValue('photo', file)}
							required
						/>
					</div>
					<div className='form-group'>
						<Input
							label='Link'
							placeholder='Link of the Announcement'
							{...register('link')}
							required
						/>
					</div>
					<div className='col-lg-12 col-md-12'>
						<div className='form-check'>
							<input
								type='checkbox'
								className='form-check-input'
								id='ship-different-address'
								{...register('is_visible')}
							/>
							<label
								className='form-check-label'
								htmlFor='ship-different-address'
							>
								Make it visible
							</label>
						</div>
					</div>

					<div className='form-group d-flex justify-content-end'>
						<Button type='submit'>{data?._id ? 'Update' : 'Create'}</Button>
					</div>
				</form>
			</Modal>
		</>
	)
}
