
import smtplib
from .text_py.text_for_emails import *
from email.message import EmailMessage
from email.utils import formataddr
from .kekeper import EmailKeys
from .kekeper import SITE_URLS
from functools import reduce

class TextFormat:
    end = '\033[0m'
    red = '\033[91m'
    underline = '\033[4m'

def sentance_structure(old_list, new_list):
    list_defined = ''
    for i in range(len(old_list)):
        if len(new_list) > i:
            print(len(new_list), i)
            if old_list[i] in new_list:
                list_defined = list_defined + f"Orginal: {old_list[i]}\n"
            else:
                list_defined = list_defined + (TextFormat.red + f"Orginal: {old_list[i]}" + TextFormat.end)
        else:
            if old_list[i] in new_list:
                list_defined = list_defined + f"Orginal: {old_list[i]},         Selected: {new_list[i]} \n"
            else:
                list_defined = list_defined + (TextFormat.red + f"Orginal: {old_list[i]}" + TextFormat.end + f",         Selected: {new_list[i]} \n")     
            
    return list_defined

#-------------------------------------------------------------------------------------------------------#
# Secret Values
#-------------------------------------------------------------------------------------------------------#


class AutoReply:

    email_host = EmailKeys.host
    send_from = EmailKeys.send_email
    email_password = EmailKeys.send_passwd
    email_port = EmailKeys.port
    receive_email = EmailKeys.owner_email
    
    #------------------------#
    # Contact form auto reply
    #------------------------#

    def contact_request(self, user_email, user_name, user_subject, owner_name):
        print('preparing message')

        contact_subject = "Thank You for Contacting Soft Subversion!"

        text_swap = {
            '[USER_NAME]' : user_name,
            '[USER_SUBJECT]' : user_subject,
            '[OWNER_NAME]': owner_name, 
            '[MAIN_SITE]':SITE_URLS.home_url
        }
        string = contact_request_body
        result_string = reduce(lambda old_string, key_var: old_string.replace(key_var, text_swap[key_var]), text_swap, string)
        contact_body = result_string


        mailer = EmailMessage()

        mailer['From'] = formataddr(("Soft Subversion", f"{self.send_from}"))
        mailer['To'] = user_email
        mailer['Subject'] = contact_subject
        mailer.set_content(contact_body)

        with smtplib.SMTP(self.email_host, self.email_port) as server:
            try:
                server.starttls()
                server.login(self.send_from, self.email_password)
                server.sendmail(self.send_from, user_email, mailer.as_string())
                server.close()
                return 'success'
            except Exception as e:
                return f"An error occurred while sending the email: {e}"


    #------------------------#
    # Email Alart
    #------------------------#

    def contact_alart(self, email, user_name, user_subject, body):

        contact_subject = "Contact Form Alart"

        text_swap = {
            '[USER_NAME]' : user_name,
            '[SUBJECT]' : user_subject, 
            '[BODY]': body, 
            '[USER_EMAIL] ': email
        }
        string = contact_alart_body
        result_string = reduce(lambda old_string, key_var: old_string.replace(key_var, text_swap[key_var]), text_swap, string)
        contact_body = result_string


        mailer = EmailMessage()

        mailer['From'] = formataddr(("Contact Form", f"{self.send_from}"))
        mailer['To'] = self.receive_email
        mailer['Subject'] = contact_subject
        mailer.set_content(contact_body)

        with smtplib.SMTP(self.email_host, self.email_port) as server:
            try:
                server.starttls()
                server.login(self.send_from, self.email_password)
                server.sendmail(self.send_from, self.receive_email, mailer.as_string())
                server.close()
                return 'success'
            except Exception as e:
                return f"An error occurred while sending the email: {e}"
            
    #------------------------#
    # Email Alart
    #------------------------#

    def review_submitted(self, display, orginal_list, new_list):

        contact_subject = "Contact Form Alart"
        review_breakdown = sentance_structure(orginal_list, new_list)
        text_swap = {
            '[DISPLAY]' : display.name,
            '[LINK]': SITE_URLS.base_link,
            'BREAK_DOWN': review_breakdown
        }
        
        string = review_alart_body
        result_string = reduce(lambda old_string, key_var: old_string.replace(key_var, text_swap[key_var]), text_swap, string)
        contact_body = result_string


        mailer = EmailMessage()

        mailer['From'] = formataddr(("Contact Form", f"{self.send_from}"))
        mailer['To'] = self.receive_email
        mailer['Subject'] = contact_subject
        mailer.set_content(contact_body)

        with smtplib.SMTP(self.email_host, self.email_port) as server:
            try:
                server.starttls()
                server.login(self.send_from, self.email_password)
                server.sendmail(self.send_from, self.receive_email, mailer.as_string())
                server.close()
                return 'success'
            except Exception as e:
                return f"An error occurred while sending the email: {e}"

