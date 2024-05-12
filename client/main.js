const host = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(host)
const form = document.querySelector('form')
const input = document.querySelector('input')
const messageList = document.getElementById('messages')

// Form listeners
form.addEventListener('submit', (e) => {
  e.preventDefault()
  postMessage(input.value)
})

const sendData = (json) => ws.send(JSON.stringify(json))

const postMessage = (message) => {
  sendData({ type: 'message', data: { message } })
  input.value = ''
}

const onMessage = (data) => {
  const messageEl = document.createElement('li')
  messageEl.innerHTML = `<strong>${data.user.username}</strong><p>${data.message}</p>`

  messageList.appendChild(messageEl)
}

const onUsers = (data) => {
  console.log('users', data)
}

const onCurrentUser = (data) => {
  console.log('my profile', data)
}

// Ws listeners
ws.onopen = () => {
  console.log('WebSocket connection is open...')
}

ws.onmessage = (e) => {
  const response = JSON.parse(e.data)

  switch (response.type) {
    case 'message':
      return onMessage(response.data)
    case 'users':
      return onUsers(response.data)
    case 'currentUser':
      return onCurrentUser(response.data)
    default:
      return
  }
}

ws.onclose = () => {
  console.error('WebSocket has disconnected')
}

ws.onerror = (error) => console.error(error)
