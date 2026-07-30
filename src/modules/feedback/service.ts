import 'server-only';

type FeedbackAttachment = {
  filename: string;
  content: string;
  contentType: string;
};

type SendFeedbackEmailInput = {
  category: string;
  message: string;
  userEmail: string;
  userId: string;
  attachments: FeedbackAttachment[];
};

const categoryLabels: Record<string, string> = {
  bug: 'Повідомлення про помилку',
  idea: 'Пропозиція покращення',
  other: 'Інший відгук',
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

export async function sendFeedbackEmail({
  category,
  message,
  userEmail,
  userId,
  attachments,
}: SendFeedbackEmailInput) {
  const apiKey = process.env.RESEND_KEY;
  const recipient = process.env.FEEDBACK_TO_EMAIL;
  const sender = process.env.FEEDBACK_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    throw new Error('Feedback email is not configured');
  }

  const categoryLabel = categoryLabels[category] ?? categoryLabels.other;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: userEmail,
      subject: `[Akkta] ${categoryLabel}`,
      html: `
        <h2>${escapeHtml(categoryLabel)}</h2>
        <p><strong>Від:</strong> ${escapeHtml(userEmail)}</p>
        <p><strong>ID користувача:</strong> ${escapeHtml(userId)}</p>
        <p><strong>Відгук:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
      attachments,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Feedback email delivery failed: ${response.status} ${details}`,
    );
  }
}
