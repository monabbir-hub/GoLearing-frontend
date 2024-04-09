import { useCallback } from 'react'
import { BiPencil, BiPlus, BiTrash } from 'react-icons/bi'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { API } from '../../api'
import AdminLayout from '../../components/admin/AdminLayout'
import AddEditAnnouncement from '../../components/admin/modals/AddEditAnnouncement'
import AddEditTestimonial from '../../components/admin/modals/AddEditTestimonial'
import AddEditYoutubeVideo from '../../components/admin/modals/AddEditYoutubeVideo'
import Button from '../../components/admin/shared/Button'
import Input from '../../components/admin/shared/Input'
import { deleteConfirmation } from '../../lib/sweetAlert'
import extractYoutubeVideoId from '../../utils/extractYoutubeVideoId'

export default function SiteManagement() {
	const { data: miscData, refetch } = useQuery(
		[API.MISC.GET_ADMIN_STATIC.name],
		API.MISC.GET_ADMIN_STATIC
	)
	const { mutateAsync: updateStatic } = useMutation(API.MISC.UPDATE_STATIC)
	const { mutateAsync: uploadFile } = useMutation(API.MISC.UPLOAD_FILE)

	const handleStatic = useCallback(async (key, value) => {
		try {
			await updateStatic({
				[key]: value,
			})
			toast.success('Successfully updated')
			await refetch()
		} catch (err) {
			toast.error(err?.response?.data?.msg || err?.message)
		}
	}, [])
	const handleDeleteTestimonial = useCallback(async (data) => {
		try {
			const { isConfirmed } = await deleteConfirmation()
			if (!isConfirmed) return
			await updateStatic({
				testimonial: data,
			})
			await refetch()
			toast.success('Successfully deleted testimonial')
		} catch (err) {
			toast.error(err?.response?.data?.msg || err?.message)
		}
	}, [])
	const handleDeleteAnnouncement = useCallback(async (data) => {
		try {
			const { isConfirmed } = await deleteConfirmation()
			if (!isConfirmed) return
			await updateStatic({
				announcement: data,
			})
			await refetch()
			toast.success('Successfully deleted announcement')
		} catch (err) {
			toast.error(err?.response?.data?.msg || err?.message)
		}
	}, [])
	const handleDeleteBanner = useCallback(
		async (bannerInd) => {
			try {
				const { isConfirmed } = await deleteConfirmation()
				if (!isConfirmed) return
				await handleStatic(
					'banner',
					miscData?.data?.data?.banner?.filter((b, i) => i !== bannerInd)
				)
				toast.success('Successfully deleted banner')
			} catch (err) {
				toast.error(err?.response?.data?.msg || err?.message)
			}
		},
		[miscData]
	)
	const handleDeleteYoutubeVideo = useCallback(
		async (youtubeVideoInd) => {
			try {
				const { isConfirmed } = await deleteConfirmation()
				if (!isConfirmed) return
				await handleStatic(
					'youtube_video',
					miscData?.data?.data?.youtube_video?.filter(
						(b, i) => i !== youtubeVideoInd
					)
				)
				toast.success('Successfully deleted youtube video')
			} catch (err) {
				toast.error(err?.response?.data?.msg || err?.message)
			}
		},
		[miscData]
	)

	return (
		<AdminLayout>
			<h3 className='page-title'>
				<span>Banners</span>
			</h3>
			<div className='adminSite'>
				{miscData?.data?.data?.banner?.map((item, bannerInd) => (
					<div className='adminSite__banner' key={bannerInd}>
						<div>
							<button onClick={() => handleDeleteBanner(bannerInd)}>
								<BiTrash />
							</button>
						</div>
						<img src={item} alt='' />
					</div>
				))}
				<label>
					<input
						type='file'
						hidden
						multiple
						onChange={({ target }) =>
							uploadFile(target.files).then(({ data }) =>
								handleStatic('banner', [
									...miscData?.data?.data?.banner,
									...data.photo?.map((item) => item.path),
								])
							)
						}
					/>
					<BiPlus />
				</label>
			</div>

			<h3 className='page-title mt-xxl-5'>
				<span>Youtube Videos</span>

				<AddEditYoutubeVideo videos={miscData?.data?.data?.youtube_video}>
					<Button>+ Add New</Button>
				</AddEditYoutubeVideo>
			</h3>
			<div className='adminSite youtubeVideo'>
				{miscData?.data?.data?.youtube_video?.map((item, youtubeVideoInd) => (
					<div className='adminSite__banner' key={youtubeVideoInd}>
						<div>
							<button onClick={() => handleDeleteYoutubeVideo(youtubeVideoInd)}>
								<BiTrash />
							</button>
						</div>
						<iframe
							style={{
								aspectRatio: '1/1',
							}}
							src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
								item
							)}`}
							title='YouTube video player'
							frameBorder={0}
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
						/>
					</div>
				))}
			</div>

			<h3 className='page-title mt-xxl-5'>
				<span>Static Fields</span>
			</h3>

			<div className='d-flex w-100 gap-4'>
				<div className='form-group flex-1'>
					<Input
						full
						label='Rocket number'
						placeholder='Rocket number (12 digit)'
						type='number'
						defaultValue={miscData?.data?.data?.rocket_number}
						onBlur={({ target }) => handleStatic('rocket_number', target.value)}
					/>
				</div>

				<div className='form-group flex-1'>
					<Input
						full
						label='Bkash number'
						placeholder='Go Learning bkash number'
						type='number'
						defaultValue={miscData?.data?.data?.bkash_number}
						onBlur={({ target }) => handleStatic('bkash_number', target.value)}
					/>
				</div>

				<div className='form-group flex-1'>
					<Input
						full
						label='Nagad number'
						placeholder='Go Learning nagad number'
						type='number'
						defaultValue={miscData?.data?.data?.nagad_number}
						onBlur={({ target }) => handleStatic('nagad_number', target.value)}
					/>
				</div>
			</div>

			<h3 className='page-title mt-xxl-5'>
				Testimonials
				<AddEditTestimonial testimonials={miscData?.data?.data?.testimonial}>
					<Button>+ Add New</Button>
				</AddEditTestimonial>
			</h3>

			<div className='adminSite__testimonials'>
				{miscData?.data?.data?.testimonial?.map((item) => (
					<div key={item._id}>
						<div>
							<AddEditTestimonial
								testimonials={miscData?.data?.data?.testimonial}
								data={item}
							>
								<button>
									<BiPencil />
								</button>
							</AddEditTestimonial>
							<button
								onClick={() =>
									handleDeleteTestimonial(
										miscData?.data?.data?.testimonial?.filter(
											(tes) => String(tes._id) !== String(item._id)
										)
									)
								}
							>
								<BiTrash />
							</button>
						</div>
						<img src={item.photo} alt='' />
						<p>
							<strong>Name: </strong>
							{item.name}
						</p>
						<p>
							<strong>Designation: </strong>
							{item.designation}
						</p>
						<p>
							<strong>Text: </strong>
							{item.text}
						</p>
						<p>
							<strong>Link: </strong>
							{item.link}
						</p>
					</div>
				))}
			</div>

			<h3 className='page-title mt-xxl-5'>
				Announcements
				<AddEditAnnouncement announcements={miscData?.data?.data?.announcement}>
					<Button>+ Add New</Button>
				</AddEditAnnouncement>
			</h3>

			<div className='adminSite__testimonials'>
				{miscData?.data?.data?.announcement?.map((item) => (
					<div key={item._id}>
						<div>
							<AddEditAnnouncement
								announcements={miscData?.data?.data?.announcement}
								data={item}
							>
								<button>
									<BiPencil />
								</button>
							</AddEditAnnouncement>
							<button
								onClick={() =>
									handleDeleteAnnouncement(
										miscData?.data?.data?.announcement?.filter(
											(tes) => String(tes._id) !== String(item._id)
										)
									)
								}
							>
								<BiTrash />
							</button>
						</div>
						<img src={item.photo} alt='' />
						<p>
							<strong>Title: </strong>
							{item.title}
						</p>
						<p>
							<strong>Text: </strong>
							{item.text}
						</p>
						<p>
							<strong>Link: </strong>
							{item.link}
						</p>
						<p>
							<strong>Visible: </strong>
							{item.is_visible ? 'Yes' : 'No'}
						</p>
					</div>
				))}
			</div>
		</AdminLayout>
	)
}
