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

export default function AddEditYoutubeVideo({ children, data, videos }) {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const { mutateAsync: updateStatic } = useMutation(API.MISC.UPDATE_STATIC)

	const onSubmit = useCallback(
		async (e) => {
			e.preventDefault()
			try {
				if (data?._id) {
					await updateStatic({
						testimonial: videos.map((item) =>
							String(item._id) === String(data._id) ? formData : item
						),
					})
				} else {
					await updateStatic({
						youtube_video: [...(videos || []), e.target.youtube_video.value],
					})
				}
				await queryClient.refetchQueries(API.MISC.GET_ADMIN_STATIC.name)
				toast.success(`Successfully ${data?._id ? 'updated' : 'created'}`)
				setOpen(false)
			} catch (err) {
				toast.error(err?.response?.data?.msg || err?.message)
			}
		},
		[data, videos]
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
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<Input
							label='Youtube Video ID'
							placeholder='Youtube video ID'
							name='youtube_video'
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
