module.exports = Bundle

function Bundle(bundle) {
  if (!(this instanceof Bundle)) return new Bundle(bundle)
  this.voxels = bundle.voxels
  this.dimensions = bundle.dimensions || bundle.dims
  this.position = bundle.position
}

Bundle.prototype.bounds = function() {
  var s = this.position
  var d = this.dimensions
  var e = [s[0] + d[0], s[1] + d[1], s[2] + d[2]]
  return [
    [Math.min(s[0], e[0]), Math.min(s[1], e[1]), Math.min(s[2], e[2])],
    [Math.max(s[0], e[0]), Math.max(s[1], e[1]), Math.max(s[2], e[2])]
  ]
}

Bundle.prototype.dimensions = function() {
  var bounds = this.bounds()
  var w = bounds[1][0] - bounds[0][0]
  var h = bounds[1][1] - bounds[0][1]
  var d = bounds[1][2] - bounds[0][2]
  return [w, h, d]
}

Bundle.prototype.extract = function(func) {
  var bounds = this.bounds()
  var p = this.position
  var l = bounds[0], h = bounds[1]
  var idx = 0
  for(var z = l[2]; z < h[2]; ++z)
    for(var y = l[1]; y < h[1]; ++y)
      for(var x = l[0]; x < h[0]; ++x, ++idx)
        func(x, y, z, this.voxels[idx], idx)
  func(false, false, false)
}