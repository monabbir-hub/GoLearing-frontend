import { cloneElement, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { API } from '../../../api'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Textarea from '../shared/Textarea'
import Select from 'react-select'

Modal.setAppElement('#modal')

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		minWidth: '500px',
		maxHeight: '90vh',
		overflowX: 'hidden',
	},
}

export default function RevokeCourse({ children, data }) {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const {
		data: coursesData,
		status,
		error,
		refetch,
	} = useQuery([API.COURSES.GET_COURSES.name], API.COURSES.GET_COURSES)
	const [course, setCourse] = useState(null)
	const { mutateAsync: revoke } = useMutation(
		API.STUDENTS.REVOKE_COURSE_TO_STUDENTS
	)

	const onSubmit = useCallback(
		async (e) => {
			e.preventDefault()
			try {
				await revoke({
					course_id: course?.value,
					student_id: data?._id,
				})
				await queryClient.refetchQueries(API.STUDENTS.GET_STUDENTS.name)
				toast.success(`Successfully assigned this course`)
				setOpen(false)
			} catch (err) {
				toast.error(err?.response?.data?.msg || err?.message)
			}
		},
		[data, course]
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
				contentLabel='Assign a course to student'
			>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<Input full label='Student Name' value={data?.name} disabled />
					</div>
					<div className='form-group'>
						<Select
							options={data?.enrolled_courses?.map((item) => ({
								label: item?.title,
								value: item?._id,
							}))}
							onChange={(value) => setCourse(value)}
						/>
					</div>
					<div className='d-flex justify-content-end'>
						<Button type='submit'>Revoke</Button>
					</div>
				</form>
			</Modal>
		</>
	)
}
