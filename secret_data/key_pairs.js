const key_pairs = [
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMAIBAAI/AI4188pBO9kgB8PA8bTfDVDrp0/EZ+cRyPKXHJopDrXYX4QQFC32\\r\\nMV6VLBuBQ3P6JaQo0ciziCYx+yDOnH7VAgMBAAECPnJnMNI6nFzViamO5GNvNRUu\\r\\nHpDrHfMjuZZ+vkG+Wdf5B9p8Ca2WPhDaZt9mOVsyTE1T7bjWzkeRTgczSpgBAiAA\\r\\nx3EWEgLPoeV0QkgKZF59C8zxkpXgKI5gY7nN05CT1QIgALaKDkw0TUlLmWgmeUpg\\r\\n5zhFfY1fSHCGvYYhlcnAvwECHzsdML576NECsrfmpHXlb8jsoPmixMMgmD9W1kQM\\r\\nCVUCHy0nsanANm4vOV++RLrVhd0xs4FJVM4hRrjrjfY+rAECHxDk8a7nKYekJl0W\\r\\nwBeR+rCyTDksGNUDKxjN2yiI+mY=\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AI4188pBO9kgB8PA8bTfDVDrp0/EZ+cR\\r\\nyPKXHJopDrXYX4QQFC32MV6VLBuBQ3P6JaQo0ciziCYx+yDOnH7VAgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"},
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMQIBAAI/AIfdyX5aXqZgZ14+Y7Z5C8R2IeJ7JicNj3NuI87paV18ZU8vCaDV\\r\\nf6uUxLLUDrsa21PPsne9hEVYwSDD90APAgMBAAECPlKsk7qONQAas2u2nShg+dcf\\r\\nZzkQZMPozXyY7bMvdwwn9QMbGIZducM/Sgt6Nldb++BjCoKRVY+DpT4kIwB5AiAA\\r\\nvH/LtcsCD22Wtgb3Y1hdxXI94yMtdLt9KD5N/YyPowIgALiFAO14dm623+WOgy9t\\r\\nk9oHGopHclEaYVRvhybhZKUCH35x03qdNUKYJrLwNV7k1fIu0ijdXg6h/jDSqopc\\r\\nkbUCIACjbQGWUhQrGQOS8LcWAapq99G02XTRiljcDO+aKxUVAh9c8XLHq0UFRzjs\\r\\nOt5uGMAHqhyhw49iZ8zw2ziB4KNo\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AIfdyX5aXqZgZ14+Y7Z5C8R2IeJ7JicN\\r\\nj3NuI87paV18ZU8vCaDVf6uUxLLUDrsa21PPsne9hEVYwSDD90APAgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"},
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMwIBAAI/ALdGW7MhAlv+zP1AAF989EP+VpIf6c513hUoip82ymRhNElksg7/\\r\\nrT0zh6VEXneJBwkglVoqOSwQJa3Mlte/AgMBAAECPmfyPbwg8qeeokDYdd2yjw+p\\r\\nRwxlkUQJ0cWKUuTuPGctJOD4ysatJSeGx2gbIes0f0o363uY7+r/0tK1ZYihAiAA\\r\\n/9PZZjP1N7/olAEUxAuKGVT98xaLL2mlV2JK6hw3NwIgALdl/OHpgSjVCpljuPeY\\r\\n+4ZZ6L8tUlS4cMfY+ykrF7kCIADXZPw24+pEDS16Z8qfIYQdvgSvBj0cJ1wRze17\\r\\nXVRTAiAAiCItV2gj1rJk/r02RJwLQIwmpxo2Per21HGs5b82CQIgAMRqOBZ/wqXf\\r\\nLmv1Rx+KCHw8+YY1aqy93qghBxGIuS8=\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/ALdGW7MhAlv+zP1AAF989EP+VpIf6c51\\r\\n3hUoip82ymRhNElksg7/rT0zh6VEXneJBwkglVoqOSwQJa3Mlte/AgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"},
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMAIBAAI/AKgiQbh+8P3nxRtkOw6AahG9ohceDgc3etkRRIgrcrtJoBJUSckY\\r\\nZANTInBYgXO8CZzEi48Lo3/rcUSyuFKdAgMBAAECPnbIxP+wh1gKz6GbfXGwXb+s\\r\\n5wBIFocYtiz3WyCM+Z+ap51FjtUppFlH0Ypof0ieGuMxkkppF6uQd3nNW7/NAiAA\\r\\n6U/Tsj6v8+e+MMAVzcE1t9Am3uamb7o2US0GZC/kPwIgALh7263H6pobfBNQIl3j\\r\\n2T9kt9QK5bntkDf+RDI0YiMCHwtcJqucH8cZdoo7IBSnnqz3hpz90AbKo1Bqh9Aj\\r\\nANMCHxtOGcGq6UpN7xtcrPmAk9MSMTMtObs/Mi1XcPiNUEkCHwmYrOfuh6DCDmU6\\r\\nJlrdDkw83NKG9UrZEVmiOudXq38=\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AKgiQbh+8P3nxRtkOw6AahG9ohceDgc3\\r\\netkRRIgrcrtJoBJUSckYZANTInBYgXO8CZzEi48Lo3/rcUSyuFKdAgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"},
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMQIBAAI/AK6cyweZKGOHbgZk5nVNpfo1cTbSSVLWZ4rGhoRinOMbCo81BN09\\r\\nKfk/zMbVd/h4GchV9e8JKCgp0Pj8Mak/AgMBAAECPlbAL16nCRnpvxAOMTE2Uq/s\\r\\nvUKvVx6AxxB7cXl0RNz6VJmkACCmheAJSzeMtxSqloCv71hv9XIWhmrAs9+BAiAA\\r\\n/yIanbyD10//Cl/S9aZlEqCfIkFxKmp8gro1EFinAwIgAK80qHpl4BNm8ioD53vR\\r\\n0QZIIvy7F9paxttar7zPUhUCH1EGNqezb7dYW2mjBu8mmeCxi/goClVrHgGyOxnm\\r\\n3ZsCH1V7RKQLJmtw87/qDbvMn8YH1gImqjmfxpvpQArHwA0CIACpF5rLvJgjZ6wQ\\r\\nJVFTKFo8L+L7XPZWEeXxITxMa277\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AK6cyweZKGOHbgZk5nVNpfo1cTbSSVLW\\r\\nZ4rGhoRinOMbCo81BN09Kfk/zMbVd/h4GchV9e8JKCgp0Pj8Mak/AgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"},
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMQIBAAI/AI/adkuhmL8r7nkZypTVX0RSvWa22mPM2Cx2SJsxO38yYzXQHq6m\\r\\nZnT63O4Kctti3kNCrh5WF0wwG4F/X9i3AgMBAAECPjkx6gDOIlY4GFvr5kDgyTz4\\r\\nDLgvEYvGoVikOuABZh7iXxivW15YkO+U8HOVLohNLQ6LxtAgQKxgpqBrPg0pAiAA\\r\\n9YcHtJzyGx4sMx97iOdQ1mpe18QD1w0ToDdrywagJQIgAJX9OsRVGy9rYFnIWPSw\\r\\nPcCjNdh+pI+Yq/LxU+LBYKsCH0mE7WG/vR8xobqNKsiLu0D5CP1CzIOQftfywGxC\\r\\nx6ECH2CdMIidJZjC+tp6gkqDaBO5Tgr5cLkKp+Ai8V0EIWcCIAC8FNNCpD3kpzE/\\r\\npmldbjMhS5m7pPvYz/VwRvjviBTd\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AI/adkuhmL8r7nkZypTVX0RSvWa22mPM\\r\\n2Cx2SJsxO38yYzXQHq6mZnT63O4Kctti3kNCrh5WF0wwG4F/X9i3AgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"},
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMgIBAAI/AKooBvkmTt4hRKPJhC+12PxoRvASmJeLJRyLsm4l8tideHncqEcZ\\r\\nx2/oxvbHI234BOSkWl5ILXSOwGA3kwHbAgMBAAECPhz5o/ZZZ6S71YxujGvzc3fH\\r\\n6gyHniRwNWmfAEtxeuDRFBNFW2iiCGLn5O+9PFJlyCp4aP1V8iBiH4pg/RfBAiAA\\r\\n1oo06+NBiStrYLBfCr2HjDCJDKfiMkubcbKZc0ertwIgAMsKED1TG0cuWPDgpgAF\\r\\nYYKGueehGkw22kzzzEKQIv0CIACM0odOVwuLiE6hVuPr3uB8atdq0UAul2ZfSUZk\\r\\nXyUdAiAAsveY3uUtSy3gOdpal/QmQi5NGY2Yp4tGGsRezGFOZQIfNQh/Fuvr2yjh\\r\\nwA+Q/iBR0ggsTHVFro3s7yPjLRUJng==\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AKooBvkmTt4hRKPJhC+12PxoRvASmJeL\\r\\nJRyLsm4l8tideHncqEcZx2/oxvbHI234BOSkWl5ILXSOwGA3kwHbAgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"},
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMQIBAAI/AKEQ+AOtRaas9xfYHWIfXiuEszidQE13DxZEzp2j/e3iszbIauk2\\r\\noYa+aqAqq80tBT7qupduB0URc4pI76WzAgMBAAECPn4W06HFPraJx3IyLGaJWeZF\\r\\nnywd5p3+K6BqQzmjjQAsp/fzpk/hCwdpa+YUMywv/IVILg/7GoIWMOCKHdqBAiAA\\r\\n/lVmlN0I/JKsR9tpeJ224jFv1V/j0w79C0blHMRFQQIgAKIfIPj/evKdcE23dWgL\\r\\nqP2bcXOxsT/VlODFcrxqqfMCH19omA/WD034k8ptA9bsizO1SfeofiWp5ME7Oi2d\\r\\nb0ECH0OFUXdC+FLZjW9gzC40RQKy3dKAnEDo1GO0+G9OwU8CIADav94pdATJEX6e\\r\\nqSkCtYeG/6vypBi6MtRUKa8RvRAv\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AKEQ+AOtRaas9xfYHWIfXiuEszidQE13\\r\\nDxZEzp2j/e3iszbIauk2oYa+aqAqq80tBT7qupduB0URc4pI76WzAgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"},
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMgIBAAI/AJ465u6+L9+EnVpRzqBU/2557p1+s2qoO81MahaIIeJvD5eEqJPk\\r\\ntxqFtvMnAUaclKMM3umZdCO44RPt3R7RAgMBAAECPwCHEHRruoCW5VaD8GzWQ3e+\\r\\nT+q1GaABHRXfCqlMDmwMy264LsYDMfrsESqDsxKu/gEY4SLxBP3gljjYF7jTgQIg\\r\\nAMtKPeaV/X3kF68ZrlZpdln5REqtZv9E7JVOAzWRVRkCIADHQbkRyzoVAtBDGnyz\\r\\nbDrTq8kP17dD37FSe5jncdZ5Ah84qNab4A4o+lvHh+bZWseLyDfKgI4Gc9Vkv7uR\\r\\nQJJxAh8o8Q4v48wpaQyV3SlmTITB3XhQswhK//mVcyP12mQxAiAAqRMwmme4JY+Y\\r\\nowgurf6gYy0Bx2Wi6m49d5Wot9BUiQ==\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AJ465u6+L9+EnVpRzqBU/2557p1+s2qo\\r\\nO81MahaIIeJvD5eEqJPktxqFtvMnAUaclKMM3umZdCO44RPt3R7RAgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"},
    {"privateKey":"-----BEGIN RSA PRIVATE KEY-----\\r\\nMIIBMQIBAAI/AKVao6kvCXGqzrqlZ7g7In5DtHNxkyG3mEiBGThcEoTrYelU+ahO\\r\\nBoocXodFJAyLHx7yIhfQD0b91hgXrNLBAgMBAAECPn13iTeWuVPGh5aYa1sfg8zL\\r\\nEuGGDF5JMQPS8ZASTPnWG9IT41woCh5mF6yk0QwF3G0l3ng/+oBF5ilSQ6kBAiAA\\r\\n1sb+BBSCWuQ/BL4pdqqzNV4R5vMegVIbfJ2hRASwrwIgAMUXQLuy0jSAfUDckDve\\r\\n54yRWCbMotQ+UmFksyjCL48CIADAPku+ETGA885oi2IHwtE30qTJiRHkBT9vMpTX\\r\\nki8nAh8cOgpRV3j3f/dwVKZrjK8I2MARPnmLgCl4PV3TVoxNAh8XDN0eoL8wuCgg\\r\\n8oEulARgpAA4OgneneTgLJUfay0s\\r\\n-----END RSA PRIVATE KEY-----\\r\\n","publicKey":"-----BEGIN PUBLIC KEY-----\\r\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AKVao6kvCXGqzrqlZ7g7In5DtHNxkyG3\\r\\nmEiBGThcEoTrYelU+ahOBoocXodFJAyLHx7yIhfQD0b91hgXrNLBAgMBAAE=\\r\\n-----END PUBLIC KEY-----\\r\\n"}
]
const public_keys = [
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AI4188pBO9kgB8PA8bTfDVDrp0/EZ+cR\\\\r\\\\nyPKXHJopDrXYX4QQFC32MV6VLBuBQ3P6JaQo0ciziCYx+yDOnH7VAgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n",
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AIfdyX5aXqZgZ14+Y7Z5C8R2IeJ7JicN\\\\r\\\\nj3NuI87paV18ZU8vCaDVf6uUxLLUDrsa21PPsne9hEVYwSDD90APAgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n",
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/ALdGW7MhAlv+zP1AAF989EP+VpIf6c51\\\\r\\\\n3hUoip82ymRhNElksg7/rT0zh6VEXneJBwkglVoqOSwQJa3Mlte/AgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n",
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AKgiQbh+8P3nxRtkOw6AahG9ohceDgc3\\\\r\\\\netkRRIgrcrtJoBJUSckYZANTInBYgXO8CZzEi48Lo3/rcUSyuFKdAgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n",
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AK6cyweZKGOHbgZk5nVNpfo1cTbSSVLW\\\\r\\\\nZ4rGhoRinOMbCo81BN09Kfk/zMbVd/h4GchV9e8JKCgp0Pj8Mak/AgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n",
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AI/adkuhmL8r7nkZypTVX0RSvWa22mPM\\\\r\\\\n2Cx2SJsxO38yYzXQHq6mZnT63O4Kctti3kNCrh5WF0wwG4F/X9i3AgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n",
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AKooBvkmTt4hRKPJhC+12PxoRvASmJeL\\\\r\\\\nJRyLsm4l8tideHncqEcZx2/oxvbHI234BOSkWl5ILXSOwGA3kwHbAgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n",
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AKEQ+AOtRaas9xfYHWIfXiuEszidQE13\\\\r\\\\nDxZEzp2j/e3iszbIauk2oYa+aqAqq80tBT7qupduB0URc4pI76WzAgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n",
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AJ465u6+L9+EnVpRzqBU/2557p1+s2qo\\\\r\\\\nO81MahaIIeJvD5eEqJPktxqFtvMnAUaclKMM3umZdCO44RPt3R7RAgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n",
    "-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AKVao6kvCXGqzrqlZ7g7In5DtHNxkyG3\\\\r\\\\nmEiBGThcEoTrYelU+ahOBoocXodFJAyLHx7yIhfQD0b91hgXrNLBAgMBAAE=\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n"
]
const usrs = [
    "usr0",
    "usr114",
    "usr2333",
    "usr3Q",
    "usr4real",
    "usr514",
    "usr623",
    "usr777",
    "usr8",
    "usr⑨",
]
const pwds = [
    "supergua",
    "megagua",
    "ultragua",
    "greatgua",
    "bai",
    "mao",
    "hong",
    "tong",
    "luo",
    "li",
]
/*
for(let i=0;i<10;i++){
    let vault = await Vault.Create(usrs[i],pwds[i]);
    vault.set({
        private_key:key_pairs[i].privateKey,
        public_key:key_pairs[i].publicKey,
        keyid:i,
    })
}
*/