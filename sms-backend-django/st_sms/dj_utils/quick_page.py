import math
class Paginator:
    def __init__(self, modal, page_number, items_per_page=10):
        self.modal = modal
        self.item_count = len(modal)
        self.current_page = page_number
        self.items_per_page = items_per_page

    def last_page_number(self):
        
        return math.ceil(self.item_count / self.items_per_page )

    def page_set(self):
        end = self.current_page  * self.items_per_page
        start = end - self.items_per_page
        return list(self.modal[start:end])

    def paginate(self):
        return self.page_set()




			