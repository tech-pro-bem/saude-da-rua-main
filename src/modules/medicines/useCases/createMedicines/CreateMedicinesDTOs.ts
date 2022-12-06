export type CreateMedicinesRequestDTO = {
    fullName: string;
    CEP: string;
    state: string;
    cellPhoneWithDDD: string;
    email: string;
    medicines: {
        medicineName: string;
        milligrams: number;
        quantity: number;
        expirationDate: Date;
        pharmaceuticalForm: string;
    }[];
};
