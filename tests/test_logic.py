from core.logic import subnetear

def test_subneteo_basico():
    res = subnetear("2001:db8::/48", 64)
    assert len(res) > 0
    assert "red" in res[0]
