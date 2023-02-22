// The main goal of this program is to calculate the future revenue over time for our star-up and for our partner, the insurance company

let years = 10;






// In this section is calculated del LAM rapresenting our insurance company partners





// LAM at first year


const insuranceHealthCompaniesItaly2023 = 219 // https://www.ivass.it/pubblicazioni-e-statistiche/pubblicazioni/relazione-annuale/2022/Relazione_IVASS_sul_2021.pdF
const percentageDigitalInsuranceOffer = 41/100 // online offer percentage - https://www.osservatori.net/
const percentageIntermediaresChannelDistribution = 59.3/100 // Insurance companies with an intermediated channel distribution - https://www.ivass.it/pubblicazioni-e-statistiche/pubblicazioni/relazione-annuale/2022/Relazione_IVASS_sul_2021.pdF
const percentageInnovators = 2.5/100 // Typical percentage for innovator/early adopters

// Final target for the firts year
const LAMForInsuranceCompanies = insuranceHealthCompaniesItaly2023 * percentageDigitalInsuranceOffer * percentageIntermediaresChannelDistribution * percentageInnovators
console.log("Number of partner/insurance company at first year =", LAMForInsuranceCompanies)

// LAM over time


// It's assumed the number of companies used to have intermediares will change over time in order to cut commissons
// The Blockchain adoption for business company will increment as well as the digitalization

// #1 Blockchan Adoption
const blockchaniAdoptionin2043 = 60/100 // https://cointelegraph.com/news/global-bitcoin-adoption-to-hit-10-by-2030-blockware-repor
const blockchaniAdoptionin2023 = 4.2/100 // https://triple-a.io/crypto-ownership-data/
const blockchainAdoptionAnnualGrowth = 14.22/100 // compound interest calculated with http://www.moneychimp.com/international/it/calculator/compound_interest_calculator.htm

// #2 Digitalization
const digitalizedCompaniesOffersInItaly2021 = 11/100 //Search fo italy in DESI - Attività di vendita online da parte delle PMI in Integrazione delle tecnologie digitali - https://digital-strategy.ec.europa.eu/it/policies/countries-digitisation-performance
const digitalizedCompaniesOffersInItaly2016 = 7.4 /100 // Search fo italy in DESI - Attività di vendita online da parte delle PMI in Integrazione delle tecnologie digitali - https://digital-strategy.ec.europa.eu/en/policies/desi-italy
const digitalizedCompaniesOffersInItalyAnnualGrowth = 8.28/100  // compound interest calculated with http://www.moneychimp.com/international/it/calculator/compound_interest_calculator.htm

// #3 Intermediation
const companiesWithNoIntermerdiaresAnnualGrowth = 3/100// Assumption

// Function to calculate LAM over time
let partnersInYears = []

function partnerINCREMENTATION(years) {// inserire massimale non oltre il 100%%
    let blockchainAdoption = percentageInnovators
    let digitalization = percentageDigitalInsuranceOffer
    let intermediation = percentageIntermediaresChannelDistribution
    let partnerYeari
    let blockchainAdoptionYeari
    let digitalizationYeari
    let intermediationYeari
    for(let i=0; i < (years);i++){
        blockchainAdoptionYeari = blockchainAdoption * blockchainAdoptionAnnualGrowth
        blockchainAdoption = blockchainAdoption + blockchainAdoptionYeari
        digitalizationYeari = digitalization * digitalizedCompaniesOffersInItalyAnnualGrowth
        digitalization = digitalization + digitalizationYeari
        intermediationYeari = intermediation * companiesWithNoIntermerdiaresAnnualGrowth
        intermediation = intermediation - intermediationYeari
        partnerYeari = insuranceHealthCompaniesItaly2023 * blockchainAdoption * digitalization * intermediation;
        partnersInYears.push((partnerYeari));
    }
}

partnerINCREMENTATION(years)
console.log("Number of partner/insurance company over years =", partnersInYears)





// In this section is calculated LAM rapresenting our customer





// LAM over time


//#1 Long Term Investor in Pension Fund Retirement
const longTermInvestorsPensionFund2021 = 8771000 // https://www.covip.it/sites/default/files/relazioneannuale/relazione_per_lanno_2021_0.pdf
const longTermInvestorsPensionFund2012 = 5828674 // https://www.covip.it/sites/default/files/relazioneannuale/1370858801RelazioneAnnuale2012.pdf
const longTermInvestorsPensionFundAnnualGrowht = 4.65/100 // // compound interest calculated with http://www.moneychimp.com/international/it/calculator/compound_interest_calculator.htm

//#2 High Risk Investor
const highRiskInvestorsPercentage2021 = 8.7/100 // Investor for equity investment line - https://www.covip.it/sites/default/files/relazioneannuale/relazione_per_lanno_2021_0.pdf

//#3 Crypto Investor
const italyPopulation2022 = 58983000; // https://www.istat.it/it/archivio/indicatori+demografici#:~:text=Al%201%C2%B0%20gennaio%202022,in%20meno%20in%20un%20anno
const percentageCryptoAdoptersItaly2023 = 2.4/100;// https://triple-a.io/crypto-ownership-data/
const percentageCryptoAdoptersWorldWide2023 = 4.2/100; // https://triple-a.io/crypto-ownership-data/
const percentageAnnualGrowthWorlWideAdopters = 50/100; // https://triple-a.io/crypto-ownership-data/
const percentageAnnualGrowthItalyAdopters = percentageAnnualGrowthWorlWideAdopters * percentageCryptoAdoptersItaly2023 / percentageCryptoAdoptersWorldWide2023

//#3 Enlarged Gen Z from 15 to 34 ==> The number of crypto worldwide investor under 34 is substantial despite of the number of people under 34 in italy. Genarally talking crypto investor are younger
// The final percentage is rapresentade by weighted average between the two percentages. The weights were assumed.

const genZenEnlarged = 11357738 // http://dati.istat.it/Index.aspx?DataSetCode=DCIS_INDDEMOG1#
const percentageOnItalyPopulation = genZenEnlarged / italyPopulation2022

const percentageUnder34WorldWideAdoptersCrypto = 72/100;// https://triple-a.io/crypto-ownership-data/
const percentageUnder34World = 25;// https://www.tuttitalia.it/statistiche/popolazione-eta-sesso-stato-civile-2019/
const percentageUnder34Italy = 20.5;//https://data.worldbank.org/
const percentageUnder34ItalyAdoptersCrypto = percentageUnder34WorldWideAdoptersCrypto * percentageUnder34Italy / percentageUnder34World;

const percentageGenZEnlargedCryptoInvestors = (percentageUnder34ItalyAdoptersCrypto * 65 + percentageOnItalyPopulation * 35) /100

// Function to calculate LAM over time

let customersOverYears = []// Old and new customers each year
let customersInYears = []// New customers each year

function customersINCREMENTATION(years) {// inserire massimale non oltre il 100%%
    
    let customers = 0
    let longTermInvestors = longTermInvestorsPensionFund2021
    let cryptoInvestors = percentageCryptoAdoptersItaly2023
    let longTermInvestorsYeari
    let cryptoInvestorsYeari
    let customersYeari
    for(let i=0; i < (years);i++){
        longTermInvestorsYeari = longTermInvestors * longTermInvestorsPensionFundAnnualGrowht
        longTermInvestors = longTermInvestors  + longTermInvestorsYeari
        cryptoInvestorsYeari = cryptoInvestors * percentageAnnualGrowthItalyAdopters
        cryptoInvestors = cryptoInvestors + cryptoInvestorsYeari
        customersYeari = longTermInvestorsYeari * highRiskInvestorsPercentage2021 * cryptoInvestors * percentageGenZEnlargedCryptoInvestors
        customersInYears.push((customersYeari))
        customers = customers + customersYeari
        customersOverYears.push((customers));
    }
}

customersINCREMENTATION(years)
console.log("Number of customers over years =", customersOverYears)
console.log("Number of new customers each year =", customersInYears)





// In this section is calculated average yearly contribution for customer




// Contribution


//#1 Annual Contribution Fund Retirement
const percentageContributionUnder35 = 50/100  // tav2.13 https://www.covip.it/sites/default/files/relazioneannuale/relazione_per_lanno_2021_0.pdf
const annualContributeFundRetirementUnder35 = 2790 * percentageContributionUnder35// pag 66 https://www.covip.it/sites/default/files/relazioneannuale/relazione_per_lanno_2021_0.pdf

//#2 Annual income Crypto Investor
const annualIncomeCryptoAdoptersWorld = 25000; // https://triple-a.io/crypto-ownership-data/
const annuaIncomeItaly = 35657.5;//https://data.worldbank.org/
const annualIncomeWorldWide = 12234.8;//https://data.worldbank.org/
const annualIncomeCryptoAdoptersItaly = annualIncomeCryptoAdoptersWorld * annuaIncomeItaly/ annualIncomeWorldWide
const weightAnnualIncomeCryptoInvestors = annualIncomeCryptoAdoptersItaly / annuaIncomeItaly

//#3 Annual Contribution Fund Retirement Crypto Investor
const annualContribute = annualContributeFundRetirementUnder35 * weightAnnualIncomeCryptoInvestors
console.log("contribute",annualContribute)




// In this section is calculated yearly gross revenue for Insurance company partner




// Yearly revenue


//#1 Annual Contribution Fund Retirement
const annualRevenueForPartecipants2Years = 3.26/100 // Is calculated on weighted average ISC for PIP and open fund - tav 1.26 , tav 1.1
const annualRevenueForPartecipants35Years = 1.6/100 // Is calculated on weighted average ISC for PIP and open fund - tav 1.26 , tav 1.1
const annualCuttingRevenue = 2.25/100 // compound interest calculated with http://www.moneychimp.com/international/it/calculator/compound_interest_calculator.htm





// In this section is calculated yearly ROI 




// ROI


//#1 Annual ROI
// Investment Composition: (Garantito 6% Obbligazionario 10% Bilanciato 58% Azionario 26%) for 92,4% - Crypto Assets for 7,6%
// Prediction for Market Cap cryptocurrency are very hard. The Roi is calculated based on cautious prediction  
const annualROIfor10YearsOpenFund =  6.89/100 // ROI is calculated on weighted average 10YearsROI on open Fund(5,219%) - tav1.26 https://www.covip.it/sites/default/files/relazioneannuale/relazione_per_lanno_2021_0.pdf - Prediction for 2032 according technewsleader is 1,119,287.06$. The price has been lowered by 75% ( a yearly ROI of 27,3%) - https://technewsleader.com/predictions/bitcoin-price-prediction-2028



// In this section are calculated Insurance Company Revenue Over Time




// Revenue Over Time 


//#1 Function to calculate Revenue for Partecipants each year
let revenueForPartecipantsInYears = []
let incrementalRevenueForPartecipantsInYears = []// Incremental revenue each years

function revenueForPartecipantsINCREMENTATION(years) {
    let capital = 0
    let annualContribution = annualContribute
    let annualRevenueForPartecipants = annualRevenueForPartecipants2Years
    let annualContributei
    let annualRevenueForPartecipantsi
    let incrementalRevenueForPartecipants
    let revenueForPartecipants
    for(let i=0; i < (years);i++){
        capital = capital + annualContribution
        annualContributei = capital * annualROIfor10YearsOpenFund;
        capital = capital + annualContributei;
        annualRevenueForPartecipantsi = annualRevenueForPartecipants * annualCuttingRevenue
        annualRevenueForPartecipants = annualRevenueForPartecipants - annualRevenueForPartecipantsi
        revenueForPartecipants = capital * annualRevenueForPartecipants;
            if (i == 0){
                incrementalRevenueForPartecipants = revenueForPartecipants
                incrementalRevenueForPartecipantsInYears.push((incrementalRevenueForPartecipants));
            } else {
                incrementalRevenueForPartecipants = revenueForPartecipants - revenueForPartecipantsInYears[i - 1]
                incrementalRevenueForPartecipantsInYears.push((incrementalRevenueForPartecipants));
            }
        
        capital = capital - revenueForPartecipants;
        revenueForPartecipantsInYears.push((revenueForPartecipants));
    }
}

revenueForPartecipantsINCREMENTATION(years)
console.log("Revenue for Partecipats over years =",revenueForPartecipantsInYears )
console.log("Incremental revenue each years =",incrementalRevenueForPartecipantsInYears )

//#2 Function to calculate Total Revenue each year
let revenueTotalInYears = []

function revenueTotalINCREMENTATION(years) {
    let revenuei = 0
    let revenuex
    
    for(let i=0; i < years;i++){
        
        for(x=0; x<i+1; x++){
            revenuex = customersInYears[i-x]* incrementalRevenueForPartecipantsInYears[x]
            revenuei = revenuei + revenuex
        }
        revenueTotalInYears.push((revenuei))
    }
}

revenueTotalINCREMENTATION(years)
console.log("Total Revenue each years =",revenueTotalInYears )





// In this section are calculated Our Revenue Over Time




// Revenue Over Time 


//#1 Function to calculate Revenue 
const feePercentageOnRevenue = 1.5/100// Justified by the cut cost for Insurance Company
const subscriptionRevenueForYear = 20000
let ourRevenueinYears = []
let ourFixedRevenueinYears = []
let ourVariableRevenueinYears = []

function ourRevenueINCREMENTATION (years) {
    for (i = 0; i < years; i++) {
        variableRevenue = revenueTotalInYears[i] * feePercentageOnRevenue
        ourVariableRevenueinYears.push((variableRevenue))
        fixedRevenue = partnersInYears[i] * subscriptionRevenueForYear
        ourFixedRevenueinYears.push((fixedRevenue))
        totalRevenue = variableRevenue + fixedRevenue
        ourRevenueinYears.push((totalRevenue))
    }
}

ourRevenueINCREMENTATION(years)
console.log("Our total Revenue in Years", ourRevenueinYears)
console.log("Our fixed Revenue in Years", ourFixedRevenueinYears)
console.log("Our variable Revenue in Years", ourVariableRevenueinYears)

