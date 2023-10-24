export const headers = {
    Authorization: ``,
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }

export const dataSend = {
    "issueDateInterval": {
      "startDate": 'startDate',
      "endDate": 'endDate'
    },
    "searchContext": {
      "targetSearchEntitiesContext": {
        "targetSearchEntities": [
          {
            "type": "company",
            "sparkId": null,
            "entityId": null,
            "inn": 'inn',
            "maxFullness": true,
            "inBusinessNews": null
          }
        ],
        "onlyMainRole": true,
        "tonality": 'tonality',
        "onlyWithRiskFactors": false,
        "riskFactors": {
          "and": [],
          "or": [],
          "not": []
        },
        "themes": {
          "and": [],
          "or": [],
          "not": []
        }
      },
      "themesFilter": {
        "and": [],
        "or": [],
        "not": []
      }
    },
    "searchArea": {
      "includedSources": [],
      "excludedSources": [],
      "includedSourceGroups": [],
      "excludedSourceGroups": []
    },
    "attributeFilters": {
      "excludeTechNews": true,
      "excludeAnnouncements": true,
      "excludeDigests": true
    },
    "similarMode": "duplicates",
    "limit": 'limit',
    "sortType": "sourceInfluence",
    "sortDirectionType": "desc",
    "intervalType": "month",
    "histogramTypes": [
      "totalDocuments",
      "riskFactors"
    ]
  }