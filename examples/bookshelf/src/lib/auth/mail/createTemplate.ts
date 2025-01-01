const brandColor = '#FFBE98';
const buttonText = '#fff';

const color = {
  background: '#f9f9f9',
  text: '#444',
  mainBackground: '#fff',
  buttonBackground: brandColor,
  buttonBorder: brandColor,
  buttonText,
};

export const createTemplate = (strings: TemplateStringsArray, url: string, buttonText: string) => `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${color.mainBackground}; color: ${color.text} max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            ${strings[0]}
            <tr>
              <td align="center" style="border-radius: 5px;">
                <a href="${url}" target="_blank" style="background-color: ${color.buttonBackground}; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">                         
                  ${buttonText}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      ${strings[2]}
    </table>
  </body>`;
