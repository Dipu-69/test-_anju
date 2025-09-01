import { TextField, Button, Paper } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const schema = Yup.object({
  name: Yup.string().min(2, 'Too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().min(10, 'Please provide at least 10 characters').required('Required')
})

export default function Contact() {
  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: schema,
    onSubmit: (vals, { resetForm }) => {
      console.log('Contact form:', vals)
      alert('Thanks! We’ll get back to you soon.')
      resetForm()
    }
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <Paper className="p-6 bg-ink-800/60 border border-white/10">
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <TextField
            name="name" label="Name" value={formik.values.name} onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            name="email" label="Email" value={formik.values.email} onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="message" label="How can we help?" value={formik.values.message} onChange={formik.handleChange} multiline minRows={4}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <Button type="submit" variant="contained">Send</Button>
        </form>
      </Paper>
    </div>
  )
}