// Navigation logic
const navDashboard = document.getElementById('nav-dashboard');
const navChat = document.getElementById('nav-chat');
const navVault = document.getElementById('nav-vault');
const pages = {
  dashboard: document.getElementById('dashboard'),
  chat: document.getElementById('chat'),
  vault: document.getElementById('vault'),
};
function switchPage(target) {
  // update nav active state
  document.querySelectorAll('nav li').forEach(li => li.classList.remove('active'));
  document.getElementById('nav-' + target).classList.add('active');
  // show/hide pages
  Object.keys(pages).forEach(key => {
    pages[key].classList.toggle('active', key === target);
  });
}
navDashboard.addEventListener('click', () => switchPage('dashboard'));
navChat.addEventListener('click', () => switchPage('chat'));
navVault.addEventListener('click', () => switchPage('vault'));

// Mood tracker logic
const moodInputs = {
  happy: document.getElementById('happy'),
  sad: document.getElementById('sad'),
  angry: document.getElementById('angry'),
  calm: document.getElementById('calm'),
  anxious: document.getElementById('anxious'),
  disconnected: document.getElementById('disconnected'),
  wornout: document.getElementById('wornout'),
};
const saveMoodBtn = document.getElementById('saveMood');
const coachMessage = document.getElementById('coachMessage');

saveMoodBtn.addEventListener('click', () => {
  const moodValues = {};
  Object.keys(moodInputs).forEach(key => {
    moodValues[key] = parseInt(moodInputs[key].value, 10);
  });
  localStorage.setItem('latestMood', JSON.stringify(moodValues));
  const avgMood =
    (moodValues.happy + moodValues.calm - moodValues.sad - moodValues.angry - moodValues.anxious - moodValues.disconnected - moodValues.wornout) /
    7;
  let message;
  if (avgMood > 2) {
    message = "You're trending positive! Keep up the good vibes.";
  } else if (avgMood < -2) {
    message = "It seems like you’re having a tough day. Take some time to rest and recharge.";
  } else {
    message = "Your mood is fairly balanced. Remember, it's okay to feel a mix of emotions.";
  }
  coachMessage.textContent = message;
});

// Chat logic
const chatContainer = document.getElementById('chatContainer');
const chatInput = document.getElementById('chatInput');
const sendMsgBtn = document.getElementById('sendMsg');
const clearChatBtn = document.getElementById('clearChat');

function appendMessage(text, sender) {
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'message-user' : 'message-bot';
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function botReply() {
  const responses = [
    'I hear you. Remember to take it one step at a time.',
    'Thanks for sharing. How can I support you?',
    'It’s okay to feel this way. You are not alone.',
    'Focus on your breathing and let’s work through this together.',
    'Remember: every emotion is valid and part of the journey.',
  ];
  const reply = responses[Math.floor(Math.random() * responses.length)];
  appendMessage(reply, 'bot');
}

sendMsgBtn.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  chatInput.value = '';
  setTimeout(botReply, 600);
});

clearChatBtn.addEventListener('click', () => {
  chatContainer.innerHTML = '';
});

// Surprise generator
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseOutput = document.getElementById('surpriseOutput');

const surprises = [
  'Write a heartfelt letter to yourself or someone you care about.',
  'Go for a 10-minute walk outdoors and observe your surroundings.',
  'Try a short guided meditation or breathing exercise.',
  'Make a cup of tea and enjoy it without any distractions.',
  'List three things you’re grateful for right now.',
  'Put on your favorite song and dance like no one’s watching.',
  'Call or text a friend or family member and share a positive memory.',
];

surpriseBtn.addEventListener('click', () => {
  const pick = surprises[Math.floor(Math.random() * surprises.length)];
  surpriseOutput.textContent = pick;
});
