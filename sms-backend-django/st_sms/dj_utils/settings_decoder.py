
class DecodeSet:
    
    def __init__(self):
        self.settings_list = []
    def display_settings(self, coded_data):
        
        for coded_number in range(len(coded_data) ):
            if coded_data[coded_number: (int(coded_number) + 1)] == "1":
                self.settings_list.append('on')          
            else:
                self.settings_list.append('off')

        return self.settings_list
                

class EncodeSet:
    
    def __init__(self):
        self.binary_settings = ''
    
    def display_settings(self, raw_data):
        
        for settings_posistion in range(len(raw_data) ):
            if raw_data[settings_posistion] == 'on':
                self.binary_settings = self.binary_settings + '1'           
            else:
                self.binary_settings = self.binary_settings + '0'
        return self.binary_settings
               
               
class CheckEncodeSet:
    
    def __init__(self):
        self.settings_list = []
        
    def display_settings(self, coded_index):
        

        if coded_index == "1":
            return True   
        elif coded_index == "0":
            return False
        else:
            raise KeyError(f"Invalid coded_index value: {coded_index}. Expected '0' or '1'.")


        