const VIDEO_DATA = [ {
  id: 1,
  url: 'assets/videos/video-bg.mp4',
  previewUrl: 'assets/images/previews/1.png',
  title: '«Нет мусора — нет проблемы»',
  description: 'Профессор Кинг Минг Чан рассказывает о проблеме Гонконга'
}, {
  id: 2,
  url: 'assets/videos/video-bg.mp4',
  previewUrl: 'assets/images/previews/2.png',
  title: 'Пластиковая атака',
  description: 'Активист-экспат борется с пластиком и говорит, что никто ничего не делает, оказывается, что это не так.'
}, {
  id: 3,
  url: 'assets/videos/video-bg.mp4',
  previewUrl: 'assets/images/previews/3.png',
  title: 'Борьба за питьевые фонтанчики',
  description: '«Шесть миллионов пластиковых бутылок из-под питьевой воды. Столько ежедневно отправляется на свалку в Гонконге».'
}, {
  id: 4,
  url: 'assets/videos/video-bg.mp4',
  previewUrl: 'assets/images/previews/4.png',
  title: 'Отстоять свалку',
  description: 'Мусора все больше места под свалки все меньше, сотрудники свалки чувствуют себя в осажденной крепости, ее вот-вот закроют.'
}, {
  id: 5,
  url: 'assets/videos/video-bg.mp4',
  previewUrl: 'assets/images/previews/5.png',
  title: 'Экопарк',
  description: '«Шесть миллионов пластиковых бутылок из-под питьевой воды. Столько ежедневно отправляется на свалку в Гонконге».'
} ]

const VIDEO_LIST_TIMEOUT = 20000

let hadInteraction = false
let videoListTimeoutHandle = null

function createVideoCard (video, index) {
  const card = document.createElement('div')
  const preview = document.createElement('div')
  const info = document.createElement('div')
  const header = document.createElement('h2')
  const separator = document.createElement('hr')
  const description = document.createElement('p')
  const bottom = document.createElement('div')
  const number = document.createElement('span')
  const hint = document.createElement('span')
  const play = document.createElement('button')

  card.classList.add('video-card')
  preview.classList.add('video-preview')
  preview.style.backgroundImage = 'url(' + video.previewUrl + ')'
  info.classList.add('video-info')
  header.classList.add('card-header', 'fugue')
  separator.classList.add('card-info-separator')
  description.classList.add('small-text', 'univers')
  bottom.classList.add('card-bottom')
  number.classList.add('card-number', 'fugue')
  hint.classList.add('card-hint', 'univers', 'small-text')
  play.classList.add('card-play')

  header.textContent = video.title
  description.textContent = video.description
  number.textContent = video.id
  hint.textContent = 'Смотреть видео'

  bottom.appendChild(number)
  bottom.appendChild(hint)

  info.appendChild(header)
  info.appendChild(separator)
  info.appendChild(description)
  info.appendChild(bottom)

  preview.appendChild(play)

  card.appendChild(preview)
  card.appendChild(info)

  play.addEventListener('click', function () {
    trackInteraction()
    setPlayerVideo(video, index)
    setPlayerVisibility(true)
  })

  return card
}

function fillVideoList (videos) {
  const videoList = document.querySelector('.video-list')
  videos.forEach(function (video, index) {
    videoList.appendChild(createVideoCard(video, index))
  })
}

function trackInteraction () {
  hadInteraction = true
}

function cancelVideoListTimeout () {
  if (videoListTimeoutHandle) {
    cancelTimeout(videoListTimeoutHandle)
  }
}

function launchVideoListTimeout () {
  hadInteraction = false
  videoListTimeoutHandle = setTimeout(function () {
    if (!hadInteraction) {
      setVideoListVisibility(false)
      videoListTimeoutHandle = null
    } else {
      launchVideoListTimeout()
    }
  }, VIDEO_LIST_TIMEOUT)
}

function setVideoListVisibility (isVisible) {
  var videoList = document.querySelector('.video-list')
  if (isVisible) {
    videoList.classList.add('video-list-active')
  } else {
    videoList.classList.remove('video-list-active')
  }
}

function setPlayerVisibility (isVisible) {
  var videoPlayer = document.querySelector('.video-player')
  if (isVisible) {
    videoPlayer.classList.add('video-player-active')
  } else {
    videoPlayer.classList.remove('video-player-active')
  }
}

function setPlayerVideo (video, index) {
  document.querySelector('.video-title').innerText = video.id + '. ' + video.title
  document.querySelector('.video').src = video.url

  const prevButton = document.createElement('button')
  prevButton.classList.add('video-button', 'video-prev')
  prevButton.disabled = index === 0
  if (index !== 0) {
    prevButton.addEventListener('click', function () {
      setPlayerVideo(index - 1)
    })
  }

  const nextButton = document.createElement('button')
  nextButton.classList.add('video-button', 'video-next')
  nextButton.disabled = index === VIDEO_DATA.length - 1
  if (index < VIDEO_DATA.length -1) {
    nextButton.addEventListener('click', function () {
      setPlayerVideo(index + 1)
    })
  }

  const videoPlayer = document.querySelector('.video-player')
  videoPlayer.appendChild(prevButton)
  videoPlayer.appendChild(nextButton)
}

function handleLaunchClick () {
  setVideoListVisibility(true)
  // launchVideoListTimeout()
}

function main () {
  setVideoListVisibility(false)
  fillVideoList(VIDEO_DATA)
  document
    .querySelector('.launch')
    .addEventListener('click', handleLaunchClick)
}

document.addEventListener("DOMContentLoaded", function () {
  main()
})
