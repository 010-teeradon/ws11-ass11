// 1. Abstract Class TravelPackage
abstract class TravelPackage {
    _packageId: string;
    _packageName: string;
    _basePrice: number; // เอา protected ออกเพื่อให้คลาสอื่นดึงค่าไปใช้ตรงๆ ได้

    constructor(packageId: string, packageName: string, basePrice: number) {
        this._packageId = packageId;
        this._packageName = packageName;
        this._basePrice = basePrice;
    }

    abstract calculatePrice(people: number): number;
}

// 2. Class OneDayTrip
class OneDayTrip extends TravelPackage {
    constructor(packageId: string, packageName: string, basePrice: number) {
        super(packageId, packageName, basePrice);
    }

    calculatePrice(people: number): number {
        let total = this._basePrice * people;
        if (people >= 5) {
            total *= 0.90; // ลด 10%
        }
        return total;
    }
}

// 3. Class OvernightTrip
class OvernightTrip extends TravelPackage {
    _numberOfNights: number;

    constructor(packageId: string, packageName: string, basePrice: number, numberOfNights: number) {
        super(packageId, packageName, basePrice);
        this._numberOfNights = numberOfNights;
    }

    calculatePrice(people: number): number {
        let total = this._basePrice * people * this._numberOfNights;
        if (this._numberOfNights >= 3) {
            total *= 0.85; // ลด 15%
        }
        return total;
    }
}

// 4. Class Customer
class Customer {
    _customerId: string;
    _name: string;
    _phone: string;

    constructor(customerId: string, name: string, phone: string) {
        this._customerId = customerId;
        this._name = name;
        this._phone = phone;
    }
}

// 5. Class TravelAgency
class TravelAgency {
    private _packages: TravelPackage[] = [];

    addPackage(pkg: TravelPackage): void {
        this._packages.push(pkg);
    }

    displayPackages(): void {
        console.log("===== Travel Packages =====");
        this._packages.forEach((pkg, index) => {
            if (pkg instanceof OvernightTrip) {
                console.log(`${index + 1}. ${pkg._packageName} (Overnight - ${pkg._numberOfNights} Nights)`);
            } else {
                console.log(`${index + 1}. ${pkg._packageName} (One-Day)`);
            }
            console.log(`Price: ${pkg._basePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} Baht`);
        });
        console.log("");
    }
}

// 6. Class Booking
class Booking {
    private _bookingId: string;
    private _customer: Customer;
    private _travelPackage: TravelPackage;
    private _travelers: string[];

    constructor(bookingId: string, customer: Customer, travelPackage: TravelPackage, travelers: string[]) {
        this._bookingId = bookingId;
        this._customer = customer;
        this._travelPackage = travelPackage;
        this._travelers = travelers;
    }

    displayBookingDetail(): void {
        const count = this._travelers.length;
        const total = this._travelPackage.calculatePrice(count);

        let discText = "";
        if (this._travelPackage instanceof OneDayTrip && count >= 5) {
            discText = " (10% Disc)";
        } else if (this._travelPackage instanceof OvernightTrip && this._travelPackage._numberOfNights >= 3) {
            discText = " (15% Disc)";
        }

        console.log("===== Booking Detail =====");
        console.log(`Booking ID: ${this._bookingId}`);
        console.log(`Customer: ${this._customer._name}`);
        console.log(`Package: ${this._travelPackage._packageName}`);
        console.log(`Travelers: ${count} (${this._travelers.join(", ")})\n`);
        console.log(`Total Price${discText}: ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })} Baht`);
        console.log("Polymorphic execution call:");
        console.log(`pkg.calculatePrice(${count})`);
    }
}

// --- Run Application ---
const agency = new TravelAgency();
const pkg1 = new OneDayTrip("P001", "Bangkok City Tour", 1500);
const pkg2 = new OvernightTrip("P002", "Chiang Mai Trip", 2500, 3);

agency.addPackage(pkg1);
agency.addPackage(pkg2);
agency.displayPackages();

const customer = new Customer("C001", "Alice", "0812345678");
const travelers = ["Alice", "Bob", "Carol", "David", "Eve"];
const booking = new Booking("B001", customer, pkg1, travelers);

booking.displayBookingDetail();