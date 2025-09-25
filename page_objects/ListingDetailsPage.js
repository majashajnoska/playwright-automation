export class ListingDetailsPage {
    constructor (page) {
        this.page = page;
        this.askingPriceInfo = page.getByText('Asking Price:');
        this.squareFeetInfo = page.getByText('Square Feet:');
        this.garageInfo = page.getByText('Garage:');
        this.bathroomsInfo = page.getByText('Bathrooms:');
        this.bedroomsInfo = page.getByText('Bedrooms:').last();
    }

       async getBedroomCount() {
        const text = await this.bedroomsInfo.innerText();     
        const match = text.match(/\d+/);                      
        if (!match) throw new Error('No bedroom number found.');
        return parseInt(match[0], 10);                        
    } 
}