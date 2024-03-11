
class DecodeSet:
    
    def __init__(self):
        self.settings_list = []
    
    
    def display_settings(self, coded_data):
        
        for coded_number in range(len(coded_data) ):
            if coded_number == 0:
                self.settings_list.append('off')
                
            else:
                self.settings_list.append('on')
                
        return self.settings_list
                
                