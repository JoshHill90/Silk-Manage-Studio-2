import requests

def validate_turnstile_token(remoteip, token, secret):
    url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    
    # Prepare form data
    form_data = {
        'secret': secret,
        'response': token,
        'remoteip': remoteip
    }
    
    # Send POST request to the siteverify endpoint
    response = requests.post(url, data=form_data)
    
    # Parse the JSON response
    outcome = response.json()
    
    # Check if the validation was successful
    if outcome.get('success'):
        print("Token is valid")
        return True
    else:
        print("Token validation failed:", outcome)
        return False