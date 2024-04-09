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
	name: '',
	email: '',
	password: '',
}
export default function AddEditStudent({ children, data }) {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const { register, handleSubmit, watch, setValue } = useForm({
		defaultValues: data ? data : DEFAULT_VALUE,
	})
	const { mutateAsync: createStudent } = useMutation(
		API.STUDENTS.SIGNUP_STUDENT
	)
	const { mutateAsync: updateStudent } = useMutation(
		API.STUDENTS.UPDATE_STUDENT
	)

	const onSubmit = useCallback(
		async (formData) => {
			try {
				if (data?._id) {
					await updateStudent({
						...formData,
						_id: undefined,
						__v: undefined,
						id: formData._id,
					})
				} else {
					await createStudent(formData)
				}
				await queryClient.refetchQueries(API.STUDENTS.GET_STUDENTS.name)
				toast.success(
					`Successfully ${data?._id ? 'updated' : 'created'} a student`
				)
				setOpen(false)
			} catch (err) {
				toast.error(err?.response?.data?.msg || err?.message)
			}
		},
		[data]
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
				contentLabel={data?._id ? 'Add New' : 'Update' + 'Course'}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='form-group'>
						<Input
							label='Name'
							placeholder='Name of the student'
							{...register('name')}
						/>
					</div>
					<div className='form-group'>
						<Input
							label='Email'
							type='email'
							placeholder='Email address of the student'
							{...register('email')}
						/>
					</div>
					<div className='form-group'>
						<Input
							label='Password'
							type='password'
							placeholder='Password of the student'
							{...register('password')}
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
