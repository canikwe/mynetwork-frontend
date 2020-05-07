import moment from 'moment'

export const formatReminderToast = (r, contacts) => {
  const text = r.msg[0].toUpperCase() + r.msg.slice(1, r.msg.length)
  const contact = contacts.find(c => c.id == r.contact_id).first_name

  return text + ' ' + contact
}

export const formatReminder = (r, contacts) => {
  const date = moment(r.start).format('MMMM Do, YYYY')
  
  return date + ' - ' + formatReminderToast(r, contacts)
}
